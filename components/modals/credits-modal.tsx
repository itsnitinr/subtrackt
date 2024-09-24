import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface CreditsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CreditsModal = ({ open, setOpen }: CreditsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Credits</DialogTitle>
          <DialogDescription>
            This app would not be possible without the people that ideated and
            designed it.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <a
              href="https://x.com/dana_daniellaa"
              target="_blank"
              className="underline"
            >
              Daniella
            </a>
            <p className="text-sm text-muted-foreground">
              The entire idea behind this app was originally conceptualized and
              designed by Daniella.
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <a
              href="https://x.com/KumailNanji"
              target="_blank"
              className="underline"
            >
              Kumail Nanji
            </a>
            <p className="text-sm text-muted-foreground">
              Kumail prototyped the animations and added more interactions and
              UI elements to Daniella&apos;s design.
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <a
              href="https://x.com/iamnitinr"
              target="_blank"
              className="underline"
            >
              Nitin Ranganath
            </a>
            <p className="text-sm text-muted-foreground">
              That&apos;s me! With all the design and interactions laid out from
              Daniella and Kumail, I did my part in making this app a reality.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
