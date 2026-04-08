const [error, setError] = useState("");

const submitAndGenerate = async () => {
  setStep(4);
  setLoading(true);
  setError("");

  try {
    base44.analytics.track({
      eventName: "quote_request_submitted",
      properties: {
        project_type: data.project_type,
        location: data.location,
        budget_range: data.budget_range || null,
        has_phone: !!data.phone,
      },
    });

    const [record] = await Promise.all([
      base44.entities.QuoteRequest.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        project_type: data.project_type,
        location: data.location,
        square_footage_estimate: data.square_footage_estimate || undefined,
        budget_range: data.budget_range || undefined,
        timeline: data.timeline || undefined,
        description: data.description,
        features_selected: data.features_selected,
        status: "new",
      }),
      fetch("https://formspree.io/f/xeeranrd", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          project_type: data.project_type,
          location: data.location,
          budget_range: data.budget_range || "",
          timeline: data.timeline || "",
          description: data.description,
          features_selected: (data.features_selected || []).join(", "),
        }),
      }),
    ]);

    const response = await base44.functions.invoke("generateQuoteEstimate", {
      project_type: data.project_type,
      location: data.location,
      square_footage_estimate: data.square_footage_estimate,
      budget_range: data.budget_range,
      timeline: data.timeline,
      description: data.description,
      features_selected: data.features_selected,
    });

    const result = response?.data;

    if (!result?.success || !result?.analysis) {
      throw new Error(result?.error || "Unable to generate estimate.");
    }

    setAnalysis(result.analysis);

    if (record?.id) {
      await base44.entities.QuoteRequest.update(record.id, {
        ai_analysis: result.analysis,
        ai_estimate: result.analysis.estimate_range,
        ai_midpoint: result.analysis.likely_midpoint || null,
        ai_finish_tier: result.analysis.finish_tier || null,
        ai_timeline: result.analysis.timeline || null,
        ai_confidence: result.analysis.confidence || null,
      });
    }
  } catch (err) {
    console.error(err);
    setError(err.message || "Something went wrong generating your estimate.");
  } finally {
    setLoading(false);
  }
};