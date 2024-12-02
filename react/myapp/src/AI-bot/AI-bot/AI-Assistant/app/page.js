'use client';

import { Box, Button, Stack, TextField, Typography, ThemeProvider, createTheme, IconButton } from '@mui/material';
import { Send, ChatBubbleOutline } from '@mui/icons-material';
import { useState, useRef, useEffect } from 'react';

// Custom theme with dark blue and white palette
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#003366', // Dark blue for primary elements
    },
    secondary: {
      main: '#00509E', // Lighter blue for secondary elements
    },
    background: {
      default: '#F8FAFC', // Light gray/white for the background
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
        },
      },
    },
  },
});

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI assistant. I'll here to help you with any inquiries that you may have. I'll guide you every step of the way. Please send a message when you are ready?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat visibility

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
    setIsTyping(true);

    const newMessage = { role: 'user', content: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, newMessage]),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: '' },
      ]);

      let assistantMessage = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        assistantMessage += chunkText;

        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1 && msg.role === 'assistant'
              ? { ...msg, content: assistantMessage }
              : msg
          )
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    }

    setIsLoading(false);
    setIsTyping(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        {/* Popup button */}
        <IconButton
          onClick={() => setIsChatOpen((prev) => !prev)}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            width: 56,
            height: 56,
          }}
        >
          <ChatBubbleOutline />
        </IconButton>

        {/* Chatbox */}
        {isChatOpen && (
          <Box
            sx={{
              width: '300px',
              height: '400px',
              backgroundColor: 'white',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              mt: 2,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                p: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" fontWeight="bold">ChatBot</Typography>
            </Box>

            {/* Chat Messages */}
            <Stack
              direction="column"
              flexGrow={1}
              p={2}
              spacing={2}
              sx={{
                overflowY: 'auto',
                backgroundColor: 'background.default',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    message.role === 'assistant' ? 'flex-start' : 'flex-end'
                  }
                >
                  <Box
                    sx={{
                      backgroundColor:
                        message.role === 'assistant' ? 'primary.main' : 'secondary.main',
                      color: message.role === 'assistant' ? 'white' : 'black',
                      borderRadius: '12px',
                      p: 1.5,
                      maxWidth: '75%',
                      wordWrap: 'break-word',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {message.content}
                  </Box>
                </Box>
              ))}
              {isTyping && (
                <Box display="flex" justifyContent="flex-start">
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: '12px',
                      p: 1.5,
                      maxWidth: '75%',
                      fontStyle: 'italic',
                    }}
                  >
                    Typing...
                  </Box>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Stack>

            {/* Input Box */}
            <Stack
              direction="row"
              spacing={1}
              p={2}
              sx={{
                backgroundColor: 'white',
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{
                  backgroundColor: 'white',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={sendMessage}
                disabled={isLoading}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                <Send />
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
