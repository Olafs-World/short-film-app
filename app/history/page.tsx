import { Navigation } from '@/components/navigation';
import { requireAuth } from '@/lib/auth';
import { getUserGenerations } from '@/app/actions/generate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function HistoryPage() {
  await requireAuth();
  const generations = await getUserGenerations();
  
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">History</h1>
              <p className="text-zinc-400">View all your generated films</p>
            </div>
            <Link href="/generate">
              <Button>New Film</Button>
            </Link>
          </div>
          
          {generations.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="py-12 text-center space-y-4">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-semibold">No films yet</h3>
                <p className="text-zinc-400">
                  Create your first AI-generated short film
                </p>
                <Link href="/generate">
                  <Button>Start Creating</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {generations.map((gen) => (
                <Link key={gen.id} href={`/generation/${gen.id}`}>
                  <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{gen.premise}</CardTitle>
                          <CardDescription className="flex flex-wrap gap-x-4 gap-y-1">
                            <span className="capitalize">{gen.style}</span>
                            <span>•</span>
                            <span className="capitalize">{gen.music_vibe} music</span>
                            <span>•</span>
                            <span>{gen.duration}s</span>
                            <span>•</span>
                            <span className="uppercase">{gen.provider}</span>
                          </CardDescription>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            gen.status === 'completed'
                              ? 'bg-green-900/30 text-green-400 border border-green-800'
                              : gen.status === 'failed'
                              ? 'bg-red-900/30 text-red-400 border border-red-800'
                              : 'bg-blue-900/30 text-blue-400 border border-blue-800'
                          }`}
                        >
                          {gen.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-zinc-500">
                        Created {new Date(gen.created_at!).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
