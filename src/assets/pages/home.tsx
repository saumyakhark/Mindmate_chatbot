import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, TextField, Button, Paper, Avatar,
  ThemeProvider, createTheme, CssBaseline, List, ListItem,
  ListItemText, ListItemIcon, IconButton, CircularProgress,
  Drawer, Divider, AppBar, Toolbar, Card, CardContent,
  Tab, Tabs, Grid, Chip, LinearProgress, Tooltip
} from '@mui/material';
import {
  Send as SendIcon,
  Psychology as PsychologyIcon,
  Nightlight as NightlightIcon,
  MusicNote as MusicNoteIcon,
  Settings as SettingsIcon,
  ViewInAr as ViewInArIcon,
  SelfImprovement as SelfImprovementIcon,
  MoreVert as MoreVertIcon,
  Menu as MenuIcon,
  Medication as MedicationIcon,
  Favorite as FavoriteIcon,
  Spa as SpaIcon,
  AutoAwesome as AutoAwesomeIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Create Material UI theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7e57c2',
    },
    secondary: {
      main: '#00bcd4',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

// Emotion visualization colors
const emotionColors = {
  happy: '#FFD700',
  sad: '#4682B4',
  angry: '#FF4500',
  anxious: '#9370DB',
  calm: '#48D1CC',
  neutral: '#7e57c2',
};

const EmotionVisualizer = ({ emotion }: { emotion: string }) => {
  const color = emotionColors[emotion as keyof typeof emotionColors] || emotionColors.neutral;
  
  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      overflow: 'hidden', 
      borderRadius: 4,
      bgcolor: 'background.paper',
    }}>
      <Box sx={{ 
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color }}>
          {emotion.charAt(0).toUpperCase() + emotion.slice(1)} Visualization
        </Typography>
        
        <Box sx={{ position: 'relative', width: '80%', height: '60%' }}>
          {/* Dynamic visualization based on emotion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={emotion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ 
                width: '100%', 
                height: '100%', 
                background: `radial-gradient(circle, ${color}55 0%, ${color}22 70%, transparent 100%)`,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: emotion === 'happy' ? [0, 5, 0, -5, 0] : 
                          emotion === 'angry' ? [0, 2, 0, -2, 0] :
                          [0, 1, 0, -1, 0],
                }}
                transition={{ 
                  duration: emotion === 'calm' ? 4 : 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  width: '80%',
                  height: '80%',
                  background: `radial-gradient(circle, ${color} 0%, ${color}77 50%, transparent 100%)`,
                  borderRadius: '50%',
                }}
              />
            </motion.div>
          </AnimatePresence>
        </Box>
        
        <Typography variant="body1" sx={{ maxWidth: '80%', textAlign: 'center' }}>
          {emotion === 'happy' && "Your emotions appear bright and vibrant today. This radiating energy reflects your positive state."}
          {emotion === 'sad' && "The gentle blue waves represent your feelings of sadness. It's okay to feel this way."}
          {emotion === 'angry' && "The pulsing red indicates stronger emotions. Try taking deep breaths as you watch it slowly calm."}
          {emotion === 'anxious' && "These swirling patterns represent your anxious thoughts. Notice how they move and change."}
          {emotion === 'calm' && "The smooth, gentle movements reflect your tranquil emotional state."}
          {emotion === 'neutral' && "Your emotional state appears balanced. This is a good foundation."}
        </Typography>
      </Box>
    </Box>
  );
};

// Dream Journal component
const DreamJournal = () => {
  const [dream, setDream] = useState('');
  const [journalEntries, setJournalEntries] = useState<{dream: string, date: string, visual: string}[]>([
    {
      dream: "I was flying over mountains and oceans, feeling completely free...",
      date: "May 15, 2023",
      visual: "https://source.unsplash.com/random/300x200/?dream,mountains"
    },
    {
      dream: "I was in a library where all the books contained stories about my life, including chapters I haven't lived yet...",
      date: "May 10, 2023",
      visual: "https://source.unsplash.com/random/300x200/?library,books"
    }
  ]);
  
  const handleAddDream = () => {
    if (dream.trim() === '') return;
    
    const newEntry = {
      dream,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      visual: `https://source.unsplash.com/random/300x200/?${dream.split(' ').slice(0, 2).join(',')}`
    };
    
    setJournalEntries([newEntry, ...journalEntries]);
    setDream('');
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Dream Companion Journal</Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Describe your dream..."
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          endIcon={<NightlightIcon />}
          onClick={handleAddDream}
          sx={{ borderRadius: 4 }}
        >
          Save Dream
        </Button>
      </Paper>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        {journalEntries.map((entry, index) => (
          <Card key={index} sx={{ height: '100%' }}>
            <Box
              sx={{
                height: 200,
                backgroundImage: `url(${entry.visual})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <CardContent>
              <Typography variant="caption" color="text.secondary">{entry.date}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>{entry.dream}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Box>
  );
};

// Music Generator
const MoodMusic = ({ emotion }: { emotion: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 0;
          }
          return prevProgress + 1;
        });
      }, 300);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);
  
  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
    if (progress >= 100) setProgress(0);
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Mood-to-Music Generator</Typography>
      
      <Paper sx={{ p: 3, borderRadius: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <MusicNoteIcon sx={{ mr: 1, color: emotionColors[emotion as keyof typeof emotionColors] || theme.palette.primary.main }} />
          <Typography variant="h6">
            Currently generating music based on your {emotion} mood
          </Typography>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ 
            height: 8, 
            borderRadius: 4, 
            mb: 2,
            '& .MuiLinearProgress-bar': {
              backgroundColor: emotionColors[emotion as keyof typeof emotionColors] || theme.palette.primary.main
            }
          }} 
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<MusicNoteIcon />}
            onClick={handlePlayClick}
            sx={{ 
              borderRadius: 28, 
              px: 4,
              backgroundColor: emotionColors[emotion as keyof typeof emotionColors] || theme.palette.primary.main,
              '&:hover': {
                backgroundColor: emotionColors[emotion as keyof typeof emotionColors] ? `${emotionColors[emotion as keyof typeof emotionColors]}cc` : undefined
              }
            }}
          >
            {isPlaying ? 'Pause Music' : 'Generate & Play Music'}
          </Button>
        </Box>
      </Paper>
      
      <Typography variant="h6" sx={{ mb: 2 }}>Recommended for your mood:</Typography>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
        gap: '16px' 
      }}>
        {['Contemplative', 'Relaxing', 'Energizing', 'Soothing'].map((type) => (
          <Card key={type} sx={{ 
            p: 2, 
            textAlign: 'center',
            border: `2px solid ${emotionColors[emotion as keyof typeof emotionColors] || theme.palette.primary.main}33`,
            '&:hover': {
              border: `2px solid ${emotionColors[emotion as keyof typeof emotionColors] || theme.palette.primary.main}`
            }
          }}>
            <MusicNoteIcon sx={{ fontSize: 40, color: emotionColors[emotion as keyof typeof emotionColors] || theme.palette.primary.main }} />
            <Typography variant="body1">{type}</Typography>
            <Typography variant="caption">3:24</Typography>
          </Card>
        ))}
      </div>
    </Box>
  );
};

// Main component
const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [messages, setMessages] = useState<Array<{text: string, sender: string, timestamp: number}>>([
    {
      text: "Welcome to MindMate X! I'm your AI mental health assistant. How can I help you today?",
      sender: "bot",
      timestamp: Date.now()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [emotionalState, setEmotionalState] = useState('neutral');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simple emotion detection
    const lowerMessage = inputMessage.toLowerCase();
    if (lowerMessage.includes('happy') || lowerMessage.includes('joy') || lowerMessage.includes('excited')) {
      setEmotionalState('happy');
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('unhappy')) {
      setEmotionalState('sad');
    } else if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('mad')) {
      setEmotionalState('angry');
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('nervous') || lowerMessage.includes('worried')) {
      setEmotionalState('anxious');
    } else if (lowerMessage.includes('calm') || lowerMessage.includes('peaceful') || lowerMessage.includes('relaxed')) {
      setEmotionalState('calm');
    }
    
    const messageToSend = inputMessage;
    setInputMessage(''); // Clear input field
    
    try {
      // Format the prompt based on the user's message
      const prompt = `Generate a thoughtful response as a mental health assistant to this message: "${messageToSend}". The user appears to be feeling ${emotionalState}.`;
      
      // Call the AI API
      const response = await axios.post(
        'https://ai.potential.com/chatbot/',
        {
          system: 'You are an empathetic mental health assistant that provides supportive, thoughtful responses.',
          message: prompt,
          AI: 'Ameen',
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      // Get AI response or use fallback
      let aiResponse = response.data.response || "I understand you're feeling " + emotionalState + ". Would you like to tell me more about what's contributing to this feeling?";
      
      // Add bot response with a slight delay to simulate thinking
      setTimeout(() => {
        const botMessage = {
          text: aiResponse,
          sender: 'bot',
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error calling AI API:', error);
      
      // Add fallback message if API fails
      setTimeout(() => {
        const fallbackResponses = {
          happy: "Your joy is contagious! What's contributing to your happiness today?",
          sad: "I'm sorry to hear you're feeling down. Would you like to talk more about what's troubling you?",
          angry: "I can sense your frustration. Would it help to explore what triggered these feelings?",
          anxious: "Anxiety can be challenging. Would you like to try a quick breathing exercise together?",
          calm: "It's wonderful that you're feeling peaceful. What helps you maintain this sense of calm?",
          neutral: "I'm here to support you. What's on your mind today?"
        };
        
        const errorMessage = {
          text: fallbackResponses[emotionalState as keyof typeof fallbackResponses] || fallbackResponses.neutral,
          sender: 'bot',
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = (message: {text: string, sender: string, timestamp: number}) => {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        maxWidth: '80%',
        alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
        mb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          {message.sender === 'bot' && (
            <Avatar
              alt="MindMate X"
              src="https://source.unsplash.com/random/100x100/?ai,robot"
              sx={{ width: 24, height: 24, mr: 1 }}
            />
          )}
          <Typography variant="caption" color="text.secondary">
            {message.sender === 'bot' ? 'Assistant' : 'You'} • {formatTime(message.timestamp)}
          </Typography>
        </Box>
        
        <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: message.sender === 'user' 
              ? theme.palette.primary.main + '33' 
              : theme.palette.background.paper,
            borderRadius: 4,
            borderTopRightRadius: message.sender === 'user' ? 0 : 4,
            borderTopLeftRadius: message.sender === 'bot' ? 0 : 4,
          }}
        >
          <Typography variant="body1">{message.text}</Typography>
        </Paper>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', position: 'relative' }}>
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
            MindMate X
          </Typography>
          <Divider />
          <List>
            {[
              { text: 'Chat', icon: <PsychologyIcon />, tab: 0 },
              { text: 'Emotion AR', icon: <ViewInArIcon />, tab: 1 },
              { text: 'Dream Journal', icon: <NightlightIcon />, tab: 2 },
              { text: 'Mood Music', icon: <MusicNoteIcon />, tab: 3 },
            ].map((item, index) => (
              <ListItem 
                key={item.text}
                onClick={() => {
                  setActiveTab(item.tab);
                  setDrawerOpen(false);
                }}
                sx={{ 
                  '&.Mui-selected': {
                    bgcolor: theme.palette.primary.main + '33'
                  }
                }}
              >
                <ListItemIcon sx={{ color: activeTab === item.tab ? 'primary.main' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        
        {/* Desktop sidebar with enhanced features */}
        <Box
          sx={{
            width: { sm: 220 },
            flexShrink: 0,
            display: { xs: 'none', sm: 'block' },
            height: '100vh',
            position: 'relative',
          }}
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: 220,
                borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                background: 'linear-gradient(180deg, rgba(25, 25, 25, 1) 0%, rgba(35, 35, 35, 1) 100%)',
                height: '100%',
                position: 'absolute',
                overflow: 'hidden',
              },
            }}
            open
          >
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(255,255,255,0.2)',
              },
              pb: 2, // Added padding at the bottom to ensure content isn't trimmed
            }}>
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <motion.div
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                >
                  <SelfImprovementIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: '1.4rem' }} />
                </motion.div>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  MindMate X
                </Typography>
              </Box>
              
              {/* Mood indicator with animation */}
              <Box sx={{ px: 2, mb: 1.5 }}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                >
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    background: 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: `1px solid ${emotionColors[emotionalState as keyof typeof emotionColors]}33`,
                  }}
                  onClick={() => setActiveTab(1)} // Navigate to Emotion AR
                  >
                    <Box sx={{ 
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '5px',
                      background: `linear-gradient(to right, ${emotionColors[emotionalState as keyof typeof emotionColors]} 30%, rgba(255,255,255,0.1) 70%)`,
                      borderRadius: '0 0 8px 8px'
                    }} />
                    
                    <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1 }}>
                      Current Mood
                    </Typography>
                    
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        background: emotionColors[emotionalState as keyof typeof emotionColors],
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                        fontSize: '1.5rem'
                      }}>
                        {emotionalState === 'happy' && '😊'}
                        {emotionalState === 'sad' && '😔'}
                        {emotionalState === 'angry' && '😠'}
                        {emotionalState === 'anxious' && '😰'}
                        {emotionalState === 'calm' && '😌'}
                        {emotionalState === 'neutral' && '😐'}
                      </Box>
                    </motion.div>
                    
                    <Typography variant="body2" sx={{ 
                      textTransform: 'capitalize', 
                      fontWeight: 'bold',
                      color: emotionColors[emotionalState as keyof typeof emotionColors] 
                    }}>
                      {emotionalState}
                    </Typography>
                    
                    <Typography variant="caption" sx={{ 
                      color: 'text.secondary',
                      fontSize: '0.7rem',
                      mt: 0.5
                    }}>
                      Click to explore
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
              
              <Divider sx={{ mx: 2 }} />
              
              {/* Main menu navigation */}
              <List sx={{ mt: 1, px: 1 }}>
                {[
                  { text: 'Chat', icon: <PsychologyIcon />, tab: 0, description: 'Talk with your AI assistant' },
                  { text: 'Emotion AR', icon: <ViewInArIcon />, tab: 1, description: 'Visualize your emotions' },
                  { text: 'Dreams', icon: <NightlightIcon />, tab: 2, description: 'Journal your dreams' },
                  { text: 'Music', icon: <MusicNoteIcon />, tab: 3, description: 'Generate mood music' },
                ].map((item) => (
                  <motion.div
                    key={item.text}
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Tooltip title={item.description} placement="right" arrow>
                      <ListItem 
                        onClick={() => setActiveTab(item.tab)}
                        sx={{ 
                          borderRadius: '0 24px 24px 0', 
                          mb: 0.5,
                          py: 0.75,
                          cursor: 'pointer',
                          bgcolor: activeTab === item.tab ? theme.palette.primary.main + '33' : 'transparent',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.08)'
                          }
                        }}
                      >
                        <ListItemIcon sx={{ 
                          color: activeTab === item.tab ? theme.palette.primary.main : 'inherit', 
                          minWidth: 35,
                          transition: 'transform 0.2s',
                          transform: activeTab === item.tab ? 'scale(1.1)' : 'scale(1)'
                        }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text} 
                          primaryTypographyProps={{ 
                            fontWeight: activeTab === item.tab ? 'bold' : 'normal',
                            color: activeTab === item.tab ? theme.palette.primary.main : 'inherit',
                            fontSize: '0.9rem'
                          }} 
                        />
                      </ListItem>
                    </Tooltip>
                  </motion.div>
                ))}
              </List>
              
              {/* Quick actions buttons */}
              <Box sx={{ px: 2, mt: 2 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block', fontSize: '0.7rem' }}>
                  Quick Actions
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Chip 
                      icon={<MedicationIcon sx={{ fontSize: '0.8rem' }} />} 
                      label="Calm" 
                      size="small" 
                      variant="outlined"
                      sx={{ 
                        borderColor: emotionColors.calm + '66',
                        color: emotionColors.calm,
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setInputMessage("Help me with a quick calming exercise");
                        setTimeout(() => {
                          const form = document.querySelector('form');
                          if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
                        }, 100);
                      }}
                    />
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Chip 
                      icon={<FavoriteIcon sx={{ fontSize: '0.8rem' }} />} 
                      label="Gratitude" 
                      size="small" 
                      variant="outlined"
                      sx={{ 
                        borderColor: emotionColors.happy + '66',
                        color: emotionColors.happy,
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setInputMessage("Let's practice gratitude - what should I focus on?");
                        setTimeout(() => {
                          const form = document.querySelector('form');
                          if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
                        }, 100);
                      }}
                    />
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Chip 
                      icon={<SpaIcon sx={{ fontSize: '0.8rem' }} />} 
                      label="Relax" 
                      size="small" 
                      variant="outlined"
                      sx={{ 
                        borderColor: theme.palette.primary.main + '66',
                        color: theme.palette.primary.main,
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setInputMessage("I need a quick relaxation technique");
                        setTimeout(() => {
                          const form = document.querySelector('form');
                          if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
                        }, 100);
                      }}
                    />
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Chip 
                      icon={<AutoAwesomeIcon sx={{ fontSize: '0.8rem' }} />} 
                      label="Inspire" 
                      size="small" 
                      variant="outlined"
                      sx={{ 
                        borderColor: theme.palette.secondary.main + '66',
                        color: theme.palette.secondary.main,
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setInputMessage("Share an inspiring quote for my day");
                        setTimeout(() => {
                          const form = document.querySelector('form');
                          if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
                        }, 100);
                      }}
                    />
                  </motion.div>
                </Box>
              </Box>
              
              {/* Usage statistics */}
              <Box sx={{ px: 2, mt: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block', fontSize: '0.7rem' }}>
                  Session Stats
                </Typography>
                
                <Box sx={{ mb: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption">Messages</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{messages.length}</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(messages.length * 5, 100)} 
                    sx={{ 
                      height: 4, 
                      borderRadius: 1,
                      bgcolor: 'rgba(255,255,255,0.1)', 
                      '& .MuiLinearProgress-bar': {
                        bgcolor: theme.palette.primary.main
                      }
                    }} 
                  />
                </Box>
                
                <Box sx={{ mb: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption">Mood Insights</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>42%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={42} 
                    sx={{ 
                      height: 4, 
                      borderRadius: 1,
                      bgcolor: 'rgba(255,255,255,0.1)', 
                      '& .MuiLinearProgress-bar': {
                        bgcolor: theme.palette.secondary.main
                      }
                    }} 
                  />
                </Box>
              </Box>

              {/* Daily wellness tip */}
              <Box sx={{ px: 2, mt: 2 }}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Paper sx={{ 
                    p: 1.5, 
                    bgcolor: 'rgba(126, 87, 194, 0.1)', 
                    borderRadius: 2,
                    border: '1px solid rgba(126, 87, 194, 0.2)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => {
                    setInputMessage("Tell me more about this wellness tip");
                    setTimeout(() => {
                      const form = document.querySelector('form');
                      if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
                    }, 100);
                  }}
                  >
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: 0, 
                      p: 0.5, 
                      borderRadius: '0 0 0 8px', 
                      bgcolor: 'rgba(126, 87, 194, 0.2)' 
                    }}>
                      <AutoAwesomeIcon sx={{ fontSize: '0.7rem', color: theme.palette.primary.main }} />
                    </Box>
                    
                    <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', display: 'block' }}>
                      Daily Wellness Tip
                    </Typography>
                    
                    <Typography variant="body2" sx={{ fontSize: '0.75rem', mt: 0.5, lineHeight: 1.4 }}>
                      Taking 3 deep breaths can activate your parasympathetic nervous system and reduce stress.
                    </Typography>
                    
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem', display: 'block', mt: 0.5 }}>
                      Tap to learn more
                    </Typography>
                  </Paper>
                </motion.div>
              </Box>
              
              {/* Bottom privacy section - with fixed position to ensure it's always visible */}
              <Box sx={{ 
                p: 1.5, 
                mt: 'auto',
                position: 'sticky',
                bottom: 0,
                background: 'linear-gradient(0deg, rgba(35, 35, 35, 1) 0%, rgba(35, 35, 35, 0.9) 100%)',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                pt: 1.5,
              }}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Chip
                    icon={<SettingsIcon sx={{ fontSize: '0.8rem' }} />}
                    label="Privacy Mode"
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ 
                      width: '100%', 
                      justifyContent: 'flex-start', 
                      height: 32,
                      cursor: 'pointer',
                      mb: 0.5,
                    }}
                    onClick={() => alert('Privacy Mode Activated: All data remains on-device')}
                  />
                </motion.div>
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.65rem' }}>
                  On-device processing active
                </Typography>
              </Box>
            </Box>
          </Drawer>
        </Box>
        
        {/* Main content with left margin */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            overflow: 'hidden',
            ml: { xs: 0, sm: 0 } // No need for margin as we defined the sidebar width above
          }}
        >
          {/* Mobile top bar */}
          <AppBar position="static" color="transparent" elevation={0} sx={{ display: { sm: 'none' } }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                MindMate X
              </Typography>
              <IconButton color="inherit">
                <MoreVertIcon />
              </IconButton>
            </Toolbar>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': { minWidth: 10 },
                '& .MuiTabs-indicator': { height: 3, borderRadius: 3 }
              }}
            >
              <Tab icon={<PsychologyIcon />} iconPosition="start" label="Chat" />
              <Tab icon={<ViewInArIcon />} iconPosition="start" label="AR" />
              <Tab icon={<NightlightIcon />} iconPosition="start" label="Dreams" />
              <Tab icon={<MusicNoteIcon />} iconPosition="start" label="Music" />
            </Tabs>
          </AppBar>
          
          {/* Main content based on active tab */}
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: { xs: 1, sm: 2 } }}>
            {activeTab === 0 && (
              <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
              }}>
                <Box sx={{ 
                  flexGrow: 1, 
                  overflow: 'auto', 
                  px: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderMessageContent(message)}
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        alt="MindMate X"
                        src="https://source.unsplash.com/random/100x100/?ai,robot"
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          bgcolor: theme.palette.background.paper,
                          borderRadius: 4,
                          borderTopLeftRadius: 0,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <CircularProgress size={20} thickness={5} sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">Assistant is thinking...</Typography>
                      </Paper>
                    </Box>
                  )}
                  <div ref={messagesEndRef} />
                </Box>
                
                <Paper 
                  component="form" 
                  onSubmit={sendMessage}
                  elevation={3} 
                  sx={{ 
                    p: 2, 
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 4,
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Type your message..."
                    variant="outlined"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    sx={{ 
                      mr: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 4,
                      }
                    }}
                  />
                  <Button 
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    disabled={inputMessage.trim() === '' || isTyping}
                    sx={{ 
                      borderRadius: 4, 
                      minWidth: 'auto', 
                      p: 1,
                      height: 56,
                      width: 56,
                    }}
                  >
                    <SendIcon />
                  </Button>
                </Paper>
              </Box>
            )}
            
            {activeTab === 1 && <EmotionVisualizer emotion={emotionalState} />}
            {activeTab === 2 && <DreamJournal />}
            {activeTab === 3 && <MoodMusic emotion={emotionalState} />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home; 