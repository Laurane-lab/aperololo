import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import BrevoForm from "@/components/BrevoForm";
import PremiumHighlight from "@/components/PremiumHighlight";
import Confetti from 'react-confetti';
import { useAuth } from "@/hooks/use-auth";
import { usePremium } from "@/hooks/use-premium";
import { useNavigate } from "react-router-dom";
import { games } from "@/data/games";

// Assets constants
const catMascot = "/assets/New mascot.png";
const balloonsIcon = "/assets/icon/balloons.png";
const cardIcon = "/assets/icon/card.png";
const cheersIcon = "/assets/icon/cheers.png";
const microphoneIcon = "/assets/icon/microphone.png";
const cauldronIcon = "/assets/icon/cauldron-thks-icongeek26.png";
const cloakIcon = "/assets/icon/cloak-thks-icongeek26.png";
const hatIcon = "/assets/icon/hat-thks-icongeek26.png";

const IndexBis = () => {
  const { user, logout } = useAuth();
  const { isPremium } = usePremium();
  const navigate = useNavigate();
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Calculer automatiquement le nombre de jeux gratuits et payants
  const freeGamesCount = games.filter(game => !game.is_premium).length;
  const premiumGamesCount = games.filter(game => game.is_premium).length;
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  
  // S'assurer que le scroll fonctionne sur cette page (correction du problème avec le drawer)
  useEffect(() => {
    // Nettoyer les styles potentiellement laissés par des composants modaux/drawer
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.bottom = '';

    // Gérer les dimensions pour les confettis
    const detectSize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    detectSize();
    window.addEventListener('resize', detectSize);
    
    // Gestionnaire de scroll pour réactiver les confettis
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Si on scroll vers le haut (et qu'on était descendu d'au moins 100px)
      if (currentScrollY < lastScrollY && currentScrollY < lastScrollY - 50) {
        setShowConfetti(true);
        
        // Arrêter les confettis après 10 secondes
        setTimeout(() => {
          setShowConfetti(false);
        }, 10000);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Arrêter les confettis après 10 secondes au chargement initial
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => {
      window.removeEventListener('resize', detectSize);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [lastScrollY]);

  const gameExamples = [
    {
      name: "Le mur du son",
      modeDeJeu: "Solo ou en équipe",
      players: "3 à 10",
      duree: "15-30 min",
      shortDescription: "Ce n'est pas celui de Willy Denzey mais il va tous vous faire chanter !",
      icon: cauldronIcon
    },
    {
      name: "Jusqu'à 10",
      modeDeJeu: "Solo",
      players: "3 à 5",
      duree: "15 min",
      shortDescription: "Et si compter jusqu'à 10 n'était pas si simple mais finalement très drôle ?",
      icon: hatIcon
    },
    {
      name: "Dos à dos",
      modeDeJeu: "En binôme",
      players: "4 à 10",
      duree: "20 min",
      shortDescription: "Connaissais-tu vraiment ton binôme ou les invités seront-ils plus forts que vous ?",
      icon: cloakIcon
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Confettis */}
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          numberOfPieces={200}
          recycle={false}
          colors={['#FF6B9D', '#FF8A3D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']}
          gravity={0.1}
          initialVelocityY={10}
        />
      )}
      
      <Header />
      
      {/* Section Héros avec animations */}
      <section className="relative py-16 px-4 text-center overflow-hidden">
        {/* Fond animé avec gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-party-pink/20 via-party-orange/15 to-party-blue/25 animate-pulse"></div>
        
        {/* Éléments flottants animés */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Images de jeux flottantes */}
          <div className="absolute top-10 left-[10%] w-16 h-16 md:w-20 md:h-20 animate-pulse" style={{ animationDelay: '0s', animationDuration: '5s' }}>
            <img src={balloonsIcon} alt="Jeu" className="w-full h-full object-contain" />
          </div>
          
          <div className="absolute top-20 right-[5%] w-14 h-14 md:w-18 md:h-18 animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}>
            <img src={cardIcon} alt="Jeu" className="w-full h-full object-contain" />
          </div>
          
          <div className="absolute bottom-20 left-[20%] w-12 h-12 md:w-16 md:h-16 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}>
            <img src={cheersIcon} alt="Jeu" className="w-full h-full object-contain" />
          </div>
          
          <div className="absolute bottom-6 right-[25%] w-12 h-12 md:w-16 md:h-16 animate-pulse" style={{ animationDelay: '3s', animationDuration: '5s' }}>
            <img src={microphoneIcon} alt="Jeu" className="w-full h-full object-contain" />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto pt-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800" style={{ lineHeight: '1.2', textShadow: '1px 1px 2px rgba(255,255,255,0.8), 0px 0px 4px rgba(255,255,255,0.5)' }}>
            Des jeux pour animer tes soirées et week-end entre amis ou en famille
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 leading-relaxed tracking-normal" style={{ textShadow: '0px 0px 1px rgba(20, 19, 19, 0.7)' }}>
            Découvres nos jeux clés en main : simples, rapides à mettre en place, sans préparation. <br />
            Pensés pour jouer 15 minutes ou plusieurs jours.
          </p>
          <div className="mb-8">
            <p className="text-base sm:text-lg md:text-xl text-gray-800" style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.7)' }}>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base sm:text-lg px-8 py-3 bg-gradient-to-r from-party-orange to-party-pink hover:from-party-pink hover:to-party-orange">
              <a href="/game-explanation">Jouer gratuitement</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-primary">
            Comment fonctionne Apérololo ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">🎪</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-foreground">Découvre les jeux</h3>
              <p className="text-muted-foreground">
                Jeux musicaux, défis, énigmes ou culture G — trouve le jeu qui colle à ton groupe et au moment
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-foreground">Joue gratuitement</h3>
              <p className="text-muted-foreground">
                3 jeux sont offerts et disponibles immédiatement sans inscription nécessaire
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-foreground">Passe au niveau supérieur</h3>
              <p className="text-muted-foreground">
                7 jeux supplémentaires + du contenu bonus pour les jeux gratuits à 4,99€ en devenant premium
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Exemples de jeux */}
      <section className="py-16 px-4 bg-gradient-to-r from-party-blue/10 via-party-green/10 to-party-orange/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-primary">
            Le bon jeu pour chaque moment
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Nos jeux sont faits pour animer facilement n'importe quelle occasion — apéro, EVG, EVJF, week-end ou dîner. Ils sont faciles à lancer, demandent peu (voir pas) de préparation et ont été pensés pour créer du lien. Fini les silences gênants et les recherches interminables d'idées !
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            {gameExamples.map((game) => {
              const isMurDuSon = game.name === "Le mur du son";
              const isJusqua10 = game.name === "Jusqu'à 10";
              const isDosADos = game.name === "Dos à dos";
              let cardProps;
              if (isMurDuSon) {
                cardProps = {
                  role: "button",
                  tabIndex: 0,
                  onClick: () => window.location.href = "/game-explanation?id=le-mur-du-son",
                  onKeyPress: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      window.location.href = "/game-explanation?id=le-mur-du-son";
                    }
                  },
                  className: "rounded-xl border border-gray-200 bg-gray-50 shadow-sm p-6 flex flex-col items-start text-left hover:shadow-lg transition-shadow cursor-pointer outline-none focus:ring-2 focus:ring-party-pink",
                };
              } else if (isJusqua10) {
                cardProps = {
                  role: "button",
                  tabIndex: 0,
                  onClick: () => window.location.href = "/game-explanation?id=jusqua-10",
                  onKeyPress: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      window.location.href = "/game-explanation?id=jusqua-10";
                    }
                  },
                  className: "rounded-xl border border-gray-200 bg-gray-50 shadow-sm p-6 flex flex-col items-start text-left hover:shadow-lg transition-shadow cursor-pointer outline-none focus:ring-2 focus:ring-party-pink",
                };
              } else if (isDosADos) {
                cardProps = {
                  role: "button",
                  tabIndex: 0,
                  onClick: () => window.location.href = "/game-explanation?id=dos-a-dos",
                  onKeyPress: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      window.location.href = "/game-explanation?id=dos-a-dos";
                    }
                  },
                  className: "rounded-xl border border-gray-200 bg-gray-50 shadow-sm p-6 flex flex-col items-start text-left hover:shadow-lg transition-shadow cursor-pointer outline-none focus:ring-2 focus:ring-party-pink",
                };
              } else {
                cardProps = {
                  className: "rounded-xl border border-gray-200 bg-gray-50 shadow-sm p-6 flex flex-col items-start text-left hover:shadow-lg transition-shadow",
                };
              }
              return (
                <div key={game.name} {...cardProps} style={{ minHeight: '180px' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={game.icon} alt={`${game.name} icon`} className="w-8 h-8" />
                    <h3 className="text-lg font-bold text-foreground">{game.name}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <span>{game.modeDeJeu}</span> • <span>{game.players} joueurs</span> • <span>{game.duree}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{game.shortDescription}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="text-base sm:text-lg px-12 py-4 bg-gradient-to-r from-party-pink to-party-orange hover:from-party-orange hover:to-party-pink">
              <a href="/game-explanation">Jouer gratuitement</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary leading-tight">
            Pourquoi choisir nos jeux&nbsp;?
          </h2>
          <div className="text-left text-muted-foreground mb-12 max-w-2xl mx-auto flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-1"><svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#2ecc40" /><path d="M7.5 10.5l2 2 3-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <span><span className="font-bold text-party-green">Clé en main :</span> chaque jeu est expliqué de manière simple et claire, avec tout ce dont tu as besoin pour commencer immédiatement. Pas de matériel compliqué, juste du fun !</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1"><svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#2ecc40" /><path d="M7.5 10.5l2 2 3-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <span><span className="font-bold text-party-green">Universel :</span> nos jeux sont conçus pour briser la glace, créer des souvenirs ou simplement passer un bon moment, peu importe le contexte.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1"><svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#2ecc40" /><path d="M7.5 10.5l2 2 3-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <span><span className="font-bold text-party-green">Testé et approuvé :</span> nous avons testé chaque jeu pour nous assurer qu'il fonctionne et qu'il apporte de l'ambiance.</span>
            </div>
          </div>
        </div>
      </section>

      <PremiumHighlight />

      {/* Section formulaire Brevo */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mx-auto max-w-md">
            <BrevoForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndexBis;