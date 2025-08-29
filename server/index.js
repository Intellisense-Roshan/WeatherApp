require('dotenv').config();
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query
    
    if (!city) {
      return res.status(400).json({ 
        message: 'City parameter is required' 
      })
    }

    const apiKey = process.env.WEATHER_API_KEY
    if (!apiKey) {
      return res.status(500).json({ 
        message: 'Weather API key not configured' 
      })
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    )

    res.json(response.data)
  } catch (error) {
    console.error('Weather API Error:', error.response?.data || error.message)
    
    if (error.response?.status === 404) {
      return res.status(404).json({ 
        message: 'City not found. Please check the spelling and try again.' 
      })
    }
    
    if (error.response?.status === 401) {
      return res.status(500).json({ 
        message: 'Invalid API key. Please check your configuration.' 
      })
    }
    
    res.status(500).json({ 
      message: 'Failed to fetch weather data. Please try again later.' 
    })
  }
})

app.get('/api/forecast', async (req, res) => {
  try {
    const { city } = req.query
    
    if (!city) {
      return res.status(400).json({ 
        message: 'City parameter is required' 
      })
    }

    const apiKey = process.env.WEATHER_API_KEY
    if (!apiKey) {
      return res.status(500).json({ 
        message: 'Weather API key not configured' 
      })
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    )

    res.json(response.data)
  } catch (error) {
    console.error('Forecast API Error:', error.response?.data || error.message)
    
    if (error.response?.status === 404) {
      return res.status(404).json({ 
        message: 'City not found. Please check the spelling and try again.' 
      })
    }
    
    if (error.response?.status === 401) {
      return res.status(500).json({ 
        message: 'Invalid API key. Please check your configuration.' 
      })
    }
    
    res.status(500).json({ 
      message: 'Failed to fetch forecast data. Please try again later.' 
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Weather API server is running',
    timestamp: new Date().toISOString()
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err)
  res.status(500).json({ 
    message: 'Internal server error' 
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Endpoint not found' 
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Weather API server running on port ${PORT}`)
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`)
})


