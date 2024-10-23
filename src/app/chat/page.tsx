import { Chat } from '@/components/chat/chat'
import { Typography, AppBar, Toolbar } from '@mui/material';

export default function ChatPage() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'secondary.light' }}>
        <Toolbar>
          <Typography
            variant="h2"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}
          >
            ChatBot
          </Typography>
        </Toolbar>
      </AppBar>
      <Chat />
    </>
  );
}