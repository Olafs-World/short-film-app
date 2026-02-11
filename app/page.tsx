import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { getOptionalAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LandingPage() {
  const userId = await getOptionalAuth();
  
  // If already signed in, redirect to generate page
  if (userId) {
    redirect('/generate');
  }
  
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                Create Stunning
              </span>
              <br />
              <span className="bg-gradient-to-r from-zinc-400 to-zinc-600 bg-clip-text text-transparent">
                AI Short Films
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
              Transform your ideas into cinematic masterpieces. Just describe your premise, choose a style, and let AI bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/sign-up">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Creating Free
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 border-t border-zinc-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold">Describe Your Story</h3>
                <p className="text-zinc-400">
                  Enter a simple premise or story idea. No scripting required.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold">Choose Your Style</h3>
                <p className="text-zinc-400">
                  Pick from cinematic, noir, anime, documentary, and more. Add music to set the mood.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold">Watch It Come Alive</h3>
                <p className="text-zinc-400">
                  AI generates your film scene by scene. Download and share when ready.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Styles Section */}
        <section className="py-20 border-t border-zinc-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Choose Your Style
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {['Cinematic', 'Noir', 'Anime', 'Documentary', 'Sci-Fi', 'Fantasy', 'Horror', 'Comedy'].map((style) => (
                <div key={style} className="aspect-video bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-center hover:border-zinc-600 transition-colors">
                  <span className="text-lg font-semibold">{style}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Create?
            </h2>
            <p className="text-xl text-zinc-400">
              Sign up now and start generating your first AI short film in minutes.
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started Free
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          © 2026 Short Film. Part of Olafs World.
        </div>
      </footer>
    </div>
  );
}
