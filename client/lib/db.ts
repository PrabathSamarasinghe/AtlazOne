import { Pool } from 'pg';

let pool: Pool | null = null;

function createPool(): Pool {
  if (!pool) {
    // Validate environment variables
    const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASS'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: parseInt(process.env.DB_PORT || '5432'),
      // Connection pool settings
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // How long a client is allowed to remain idle
      connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
    });

    pool.on('connect', () => {
      console.log('New client connected to database');
    });

    pool.on('error', (err: Error) => {
      console.error('Unexpected error on idle database client:', err);
    });
  }
  
  return pool;
}

// Export the pool getter
export default function getPool(): Pool {
  return createPool();
}

// Export a function to test the connection
export async function testConnection(): Promise<boolean> {
  try {
    const poolInstance = getPool();
    const client = await poolInstance.connect();
    await client.query('SELECT 1');
    client.release();
    console.log('Database connection test successful');
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}