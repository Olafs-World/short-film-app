import { Navigation } from '@/components/navigation';
import { requireAuth } from '@/lib/auth';
import { getApiKeys } from '@/lib/api-keys';
import { GenerateForm } from '@/components/generate-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function GeneratePage() {
  const userId = await requireAuth();
  const apiKeys = await getApiKeys(userId);
  
  const hasAnyKey = !!(apiKeys.openaiKey || apiKeys.geminiKey);
  
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Generate Short Film</h1>
            <p className="text-zinc-400">Create your AI-powered short film in minutes</p>
          </div>
          
          {!hasAnyKey && (
            <Card className="bg-yellow-900/20 border-yellow-800">
              <CardHeader>
                <CardTitle className="text-yellow-400">API Keys Required</CardTitle>
                <CardDescription className="text-yellow-200/80">
                  You need to add at least one AI provider API key before generating films.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/settings">
                  <Button variant="outline" className="border-yellow-600 text-yellow-400 hover:bg-yellow-900/30">
                    Go to Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Film Details</CardTitle>
              <CardDescription>
                Describe your story and choose the style and mood
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GenerateForm
                hasOpenAiKey={!!apiKeys.openaiKey}
                hasGeminiKey={!!apiKeys.geminiKey}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
