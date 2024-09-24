import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface FeedbackModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const FeedbackModal = ({ open, setOpen }: FeedbackModalProps) => {
  const [feedback, setFeedback] = useState('');
  const [shouldContact, setShouldContact] = useState(false);
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast.error('Please enter your feedback');
      return;
    }

    const response = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ feedback, shouldContact, contactInfo }),
    });

    if (response.ok) {
      setOpen(false);
      toast.success('Feedback submitted');
    } else {
      toast.error('Failed to submit feedback', {
        description: 'Please try again later',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Feedback / Feature Requests</DialogTitle>
            <DialogDescription>
              If you have any feedback or feature requests, please let me know!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Textarea
              placeholder="Your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox
                checked={shouldContact}
                onCheckedChange={(checked) =>
                  setShouldContact(checked as boolean)
                }
              />
              <div className="flex flex-col gap-1 leading-none">
                <p className="text-sm">
                  Update me once the feedback is implemented
                </p>
                <p className="text-xs text-muted-foreground">
                  If you would like to be notified once the feedback is
                  implemented, please enter your email address or Twitter
                  handle.
                </p>
                <Input
                  placeholder="Your email address or Twitter handle"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="mt-2"
                  disabled={!shouldContact}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Alternately, you can also reach out to me on{' '}
              <a
                href="https://x.com/iamnitinr"
                target="_blank"
                className="underline"
              >
                Twitter
              </a>{' '}
            </p>
          </div>
          <DialogFooter>
            <Button>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
