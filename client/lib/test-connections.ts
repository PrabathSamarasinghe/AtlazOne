// Test file to verify Supabase connection
import { supabase } from '../lib/supabase'
import getPool from '../lib/db'

// Test Supabase client connection
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error)
      return false
    }
    
    console.log('Supabase connection successful:', data)
    return true
  } catch (error) {
    console.error('Supabase test failed:', error)
    return false
  }
}

// Test PostgreSQL pool connection
export async function testPostgreSQLConnection() {
  try {
    const pool = getPool()
    const result = await pool.query('SELECT NOW() as current_time')
    console.log('PostgreSQL connection successful:', result.rows[0])
    return true
  } catch (error) {
    console.error('PostgreSQL test failed:', error)
    return false
  }
}

// Combined test function
export async function testAllConnections() {
  console.log('Testing database connections...')
  
  const supabaseResult = await testSupabaseConnection()
  const postgresResult = await testPostgreSQLConnection()
  
  return {
    supabase: supabaseResult,
    postgresql: postgresResult
  }
}