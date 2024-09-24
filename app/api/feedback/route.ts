export const POST = async (req: Request) => {
  const { feedback, contactInfo } = await req.json();
  const formApiKey = process.env.FORM_API_KEY;

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: formApiKey,
        title: 'Feedback / Feature Request for Subtrackt',
        feedback: feedback,
        contactInfo: contactInfo || 'Anonymous',
      }),
    });
    const data = await response.json();

    if (!data.success) {
      return Response.json(
        { message: 'Failed to submit feedback' },
        { status: 500 }
      );
    }
  } catch {
    return Response.json(
      { message: 'Failed to submit feedback' },
      { status: 500 }
    );
  }

  return Response.json({ message: 'Feedback submitted' });
};
