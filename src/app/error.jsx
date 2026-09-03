'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Menampilkan error lengkap ke console browser
    console.error('Next.js Client Exception:', error);
  }, [error]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '40px auto' }}>
      <h2 style={{ color: '#e53e3e' }}>Terjadi Error di Client!</h2>
      
      <div style={{ background: '#1a202c', color: '#fff', padding: '16px', borderRadius: '8px', overflowX: 'auto' }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Pesan Error:</p>
        <code style={{ color: '#f56565' }}>{error?.message || 'Tidak ada pesan error'}</code>
      </div>

      {error?.stack && (
        <details style={{ marginTop: '16px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 'bold' }}>Lihat Stack Trace</summary>
          <pre style={{ background: '#2d3748', color: '#cbd5e0', padding: '12px', borderRadius: '6px', fontSize: '12px', overflowX: 'auto' }}>
            {error.stack}
          </pre>
        </details>
      )}

      <button
        onClick={() => reset()}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#3182ce',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Coba Lagi (Reset)
      </button>
    </div>
  );
}
