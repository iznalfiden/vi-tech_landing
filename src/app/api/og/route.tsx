// app/api/og/route.tsx
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.url ? new URL(request.url) : { searchParams: new URLSearchParams() };
  
  const title = searchParams.get('title') || 'Vi-Tech';
  const description = searchParams.get('description') || 'Operational Excellence Software';
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#120E2F',
          backgroundImage: 'radial-gradient(circle at 90% -20%, rgba(139,92,246,0.3), transparent 50%), radial-gradient(circle at -10% 120%, rgba(37,99,235,0.2), transparent 50%)',
          padding: '60px',
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            V
          </div>
          <span
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              color: 'white',
              marginLeft: '24px',
            }}
          >
            Vi-Tech
          </span>
        </div>
        
        {/* Title */}
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
            margin: '0 0 24px 0',
            maxWidth: '1000px',
          }}
        >
          {title}
        </h1>
        
        {/* Description */}
        <p
          style={{
            fontSize: '36px',
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            lineHeight: 1.4,
            margin: 0,
            maxWidth: '900px',
          }}
        >
          {description}
        </p>
        
        {/* Products row */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginTop: '50px',
            padding: '20px 40px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {['GoSeeiT', 'StandardiziT', 'ResolviT', 'ImproviT'].map((product) => (
            <span
              key={product}
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {product}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
