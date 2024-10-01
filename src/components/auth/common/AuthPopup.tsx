import Popup from '@/components/common/Popup';
import { Button, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

type Props = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  goto1?: string;
  goto2?: string;
  btnText1?: string;
  btnText2?: string;
  message: string;
};

export default function AuthPopup({
  openDialog,
  setOpenDialog,
  title,
  goto1,
  goto2,
  btnText1,
  btnText2,
  message,
}: Props) {
  const isMdUp = useMediaQuery('( min-width: 600px )');
  const router = useRouter();

  return (
    <Popup
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      title={title}
      actions={
        <>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => {
              setOpenDialog(false);
              router.push(goto1 || '');
            }}
          >
            {btnText1}
          </Button>
          {btnText2 && (
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => {
                setOpenDialog(false);
                router.push(goto2 || '');
              }}
            >
              {btnText2 || ''}
            </Button>
          )}
        </>
      }
    >
      <Typography variant={isMdUp ? 'h6' : 'body1'}>{message}</Typography>
    </Popup>
  );
}
