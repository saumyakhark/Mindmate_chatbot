import { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

interface Message {
  text: string;
  sender: string;
  timestamp: number;
}

interface ChatInterfaceProps {
  messages: Message[];
  sendMessage: (message: string) => void;
  isTyping: boolean;
}

const ChatInterface = ({ messages, sendMessage, isTyping }: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  
  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleMusic = () => {
    setIsPlayingMusic(!isPlayingMusic);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      padding: 2, 
      bgcolor: 'background.paper',
      borderRadius: 2,
      margin: 2,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2, 
        pb: 2, 
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src="/mindmate-avatar.png" 
            alt="MindMate X" 
            sx={{ 
              width: 50, 
              height: 50, 
              mr: 2,
              background: 'linear-gradient(135deg, #7e57c2 0%, #00bcd4 100%)'
            }}
          >
            A
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              MindMate X
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              AI Mental Health Companion
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={toggleMusic}
            startIcon={<MusicNoteIcon />}
            size="small"
            sx={{ mr: 1, borderRadius: '20px' }}
          >
            {isPlayingMusic ? 'Stop Music' : 'Play Mood Music'}
          </Button>
        </Box>
      </Box>

      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column',
        gap: 2,
        pb: 2,
        px: 2,
        mb: 2,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
        }
      }}>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  maxWidth: '80%',
                  borderRadius: 3,
                  bgcolor: message.sender === 'user' 
                    ? 'primary.main' 
                    : 'background.paper',
                  border: message.sender === 'user' 
                    ? 'none' 
                    : '1px solid rgba(255,255,255,0.1)',
                  ml: message.sender === 'user' ? 2 : 0,
                  mr: message.sender === 'user' ? 0 : 2,
                  position: 'relative',
                  '&::after': message.sender === 'user' ? {
                    content: '""',
                    position: 'absolute',
                    right: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '10px solid transparent',
                    borderLeftColor: 'primary.main',
                  } : {},
                  '&::before': message.sender === 'bot' ? {
                    content: '""',
                    position: 'absolute',
                    left: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '10px solid transparent',
                    borderRightColor: 'background.paper',
                  } : {},
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {message.text}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'right' }}>
                  {formatTime(message.timestamp)}
                </Typography>
              </Paper>
            </Box>
          </motion.div>
        ))}
        {isTyping && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Ameen is typing...
            </Typography>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 30,
          border: '1px solid rgba(255,255,255,0.1)',
          bgcolor: 'background.paper',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
        elevation={0}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <TextField
          fullWidth
          placeholder="Share your thoughts with Ameen..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          sx={{ 
            mx: 1, 
            '& .MuiInputBase-input': {
              py: 1.5,
              px: 1,
            }
          }}
        />
        <Button
          sx={{ p: '10px', borderRadius: '50%', minWidth: 'unset', mx: 0.5 }}
          color="primary"
          aria-label="voice input"
        >
          <MicIcon />
        </Button>
        <Button
          onClick={handleSend}
          disabled={!input.trim()}
          sx={{ 
            p: 1, 
            borderRadius: '50%', 
            minWidth: 'unset',
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            }
          }}
          aria-label="send message"
        >
          <SendIcon />
        </Button>
      </Paper>
    </Box>
  );
};

export default ChatInterface; 