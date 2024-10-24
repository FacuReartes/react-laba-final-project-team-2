'use client';

import { useChat } from 'ai/react';
import { Box, TextField, Paper, Typography, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef, useState } from 'react';

export const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [displayedMessage, setDisplayedMessage] = useState('');

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'assistant') {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedMessage(lastMessage.content.slice(0, index));
        index++;
        if (index > lastMessage.content.length) {
          clearInterval(interval);
        }
      }, 10); 

      return () => clearInterval(interval);
    } else {
      setDisplayedMessage(lastMessage.content);
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessage, messages]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        maxWidth: '710px',
        minWidth: '320px',
        mx: 'auto',
        height: { xs: '83vh', sm: '82vh', md: '81vh', lg: '84vh' },
        position: 'relative',
        mt: 5,
        borderRadius: '24px',
        boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 3,
          bgcolor: '#f5f5f5',
          borderRadius: '24px',
        }}
      >
        {messages.map((m, index) => (
          <Paper
            key={m.id}
            sx={{
              px: '20px',
              py: '3px',
              mb: 2,
              whiteSpace: 'pre-wrap',
              backgroundColor: m.role === 'user' ? 'custom.lightBlue' : 'custom.lightGreen',
              borderRadius: '24px',
              boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            }}
            elevation={3}
          >
            <Typography
              component="div"
              sx={{
                color: m.role === 'user' ? 'custom.blue' : 'custom.green',
              }}
            >
              <ReactMarkdown>
                {m.role === 'assistant' && index === messages.length - 1 ? displayedMessage : m.content}
              </ReactMarkdown>
            </Typography>
          </Paper>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          height: '52px',
          position: 'fixed',
          bottom: 30,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '26px',
        }}
      >
        <Box
          sx={{
            width: '90%',
            maxWidth: '780px',
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#f9f9f9',
            borderRadius: '26px',
            boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            placeholder="Ask me something..."
            onChange={handleInputChange}
            sx={{
              bgcolor: 'transparent',
              borderRadius: '8px 0 0 8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputBase-input': {
                color: '#424242',
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#b0bec5',
                opacity: 1,
              },
            }}
          />
          <IconButton 
            type="submit" 
            sx={{
              color: 'common.white',
              borderRadius: '50%',
              boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
              height: '52px',
              width: '52px',
            }}
          >
            <SendIcon sx={{ color: 'secondary.light' }} />
          </IconButton>
        </Box>
      </form>
    </Box>
  );
};
