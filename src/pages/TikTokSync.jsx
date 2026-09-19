import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function TikTokSync() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSync = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await base44.functions.invoke('syncTikTokData', {});
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">TikTok Sync</h1>
        <p className="text-slate-600 mb-8">Sync your TikTok follower data to the CRM and view recent videos.</p>

        <div className="bg-white rounded-2xl shadow-md border border-muted-foreground p-6 md:p-8">
          <Button
            onClick={handleSync}
            disabled={loading}
            className="bg-sky-400 hover:bg-sky-500 text-white font-semibold px-6 py-2.5"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Syncing...
              </>
            ) : (
              'Sync TikTok Data'
            )}
          </Button>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          {data && (
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-900">Sync Successful</p>
                  <p className="text-green-800 text-sm">Data synced to CRM</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-slate-600 text-sm">Followers</p>
                  <p className="text-2xl font-bold text-sky-400">{data.followerCount.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-slate-600 text-sm">Videos</p>
                  <p className="text-2xl font-bold text-sky-400">{data.videoCount}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Recent Videos</h3>
                <div className="space-y-2">
                  {data.recentVideos.slice(0, 5).map((video) => (
                    <div key={video.id} className="p-3 bg-slate-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-foreground">{video.title}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(video.createTime * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}