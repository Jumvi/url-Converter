import client from '#config/edgedb'

async function testConnection() {
  try {
    await client.query('SELECT "Hello, EdgeDB!"')
    console.log('Successfully connected to EdgeDB!')
  } catch (error) {
    console.error('EdgeDB connection error:', error)
  }
}

testConnection()
