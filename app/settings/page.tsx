import { Navigation } from '@/components/navigation';
import { requireAuth } from '@/lib/auth';
import { getApiKeys } from '@/lib/api-keys';
import { ApiKeyForm } from '@/components/api-key-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function SettingsPage() {
  const userId = await requireAuth();
  const apiKeys = await getApiKeys(userId);
  
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-zinc-400">Manage your API keys for AI providers</p>
          </div>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Store your OpenAI and Gemini API keys securely. These are encrypted and never shared.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApiKeyForm
                initialOpenAiKey={apiKeys.openaiKey ? '••••••••' : ''}
                initialGeminiKey={apiKeys.geminiKey ? '••••••••' : ''}
                hasOpenAiKey={!!apiKeys.openaiKey}
                hasGeminiKey={!!apiKeys.geminiKey}
              />
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>How to Get API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">OpenAI</h3>
                <p className="text-sm text-zinc-400 mb-2">
                  Create an account at{' '}
                  <a
                    href="https://platform.openai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    platform.openai.com
                  </a>{' '}
                  and generate an API key from the API Keys section.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Google Gemini</h3>
                <p className="text-sm text-zinc-400 mb-2">
                  Get a free API key from{' '}
                  <a
                    href="https://aistudio.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    Google AI Studio
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
