import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get TikTok access token
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('tiktok');

    // Fetch user profile info and stats
    const profileResponse = await fetch('https://open.tiktokapis.com/v1/user/info/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const profileData = await profileResponse.json();

    if (!profileData.data) {
      return Response.json({ error: 'Failed to fetch TikTok profile' }, { status: 400 });
    }

    const tiktokUser = profileData.data.user;
    const stats = profileData.data.user_stat;

    // Fetch recent videos
    const videosResponse = await fetch('https://open.tiktokapis.com/v1/video/list/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const videosData = await videosResponse.json();
    const videos = videosData.data?.videos || [];

    // Sync follower data to Client entity
    let client = null;
    const existingClients = await base44.asServiceRole.entities.Client.filter({
      company: tiktokUser.display_name,
    });

    if (existingClients.length > 0) {
      client = existingClients[0];
      await base44.asServiceRole.entities.Client.update(client.id, {
        notes: `TikTok Stats: ${stats.follower_count} followers, ${stats.video_count} videos\nLast synced: ${new Date().toISOString()}`,
      });
    } else {
      client = await base44.asServiceRole.entities.Client.create({
        name: tiktokUser.display_name,
        company: tiktokUser.display_name,
        notes: `TikTok Stats: ${stats.follower_count} followers, ${stats.video_count} videos\nLast synced: ${new Date().toISOString()}`,
        status: 'active',
      });
    }

    return Response.json({
      success: true,
      followerCount: stats.follower_count,
      videoCount: stats.video_count,
      displayName: tiktokUser.display_name,
      recentVideos: videos.map(v => ({
        id: v.id,
        title: v.title,
        createTime: v.create_time,
      })),
      syncedToClient: client.id,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});