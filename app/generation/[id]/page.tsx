import { Navigation } from '@/components/navigation';
import { getGeneration } from '@/app/actions/generate';
import { GenerationView } from '@/components/generation-view';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function GenerationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const generation = await getGeneration(id);
  
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Short Film</h1>
            <p className="text-zinc-400">{generation.premise}</p>
          </div>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Generation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Style:</span>
                <span className="capitalize">{generation.style}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Music Vibe:</span>
                <span className="capitalize">{generation.music_vibe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Provider:</span>
                <span className="uppercase">{generation.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Duration:</span>
                <span>{generation.duration}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Status:</span>
                <span className="capitalize">{generation.status}</span>
              </div>
            </CardContent>
          </Card>
          
          <GenerationView generation={generation} />
        </div>
      </main>
    </div>
  );
}
