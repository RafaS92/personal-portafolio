import React from 'react';
import './hero.css';
import translate from '../i18n/translate';

function Hero() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id='hero' className='hero-div'>
      <div className='hero-content' data-aos='fade-right'>
        <span className='hero-eyebrow'>
          {translate('hi')}
          <img alt='' className='taco-img' src='/images/taco-min.png' />
        </span>

        <header className='hero-heading-group'>
          <h1 className='title-v2'>{translate('im')}</h1>
          <h2 className='subtitle-v2'>{translate('ing')}</h2>
        </header>

        <div className='hero-summary'>
          <p className='herodes-v2'>{translate('hero')}</p>

          <div className='hero-actions'>
            <button
              className='hero-button hero-button-primary'
              type='button'
              onClick={() => scrollToSection('Projects-v2')}
            >
              {translate('nav4')}
            </button>
            <button
              className='hero-button hero-button-primary'
              type='button'
              onClick={() => scrollToSection('Contact-v2')}
            >
              {translate('nav6')}
            </button>
          </div>
        </div>
      </div>

      <aside
        className='hero-code-panel'
        aria-label='Developer profile code sample'
        data-aos='fade-left'
      >
        <div className='hero-code-glow' aria-hidden='true' />
        <div className='hero-code-window'>
          <div className='hero-code-titlebar'>
            <div className='hero-window-controls' aria-hidden='true'>
              <span className='hero-control hero-control-red' />
              <span className='hero-control hero-control-yellow' />
              <span className='hero-control hero-control-green' />
            </div>
            <span className='hero-code-file'>SoftwareEngineer.js</span>
            <span className='hero-titlebar-spacer' />
          </div>

          <pre className='hero-code-block'>
            <code>
              <span className='syntax-keyword'>const</span>{' '}
              <span className='syntax-func'>rafaelValdez</span> = {'{\n'}
              {'  '}role:{' '}
              <span className='syntax-string'>"Software Engineer"</span>,
              {'\n  '}stack: [
              <span className='syntax-string'>"React"</span>,{' '}
              <span className='syntax-string'>"Angular"</span>,{' '}
              <span className='syntax-string'>"Node"</span>,{' '}
              <span className='syntax-string'>"MongoDB"</span>,{' '}
              <span className='syntax-string'>"TypeScript"</span>],
              {'\n  '}focus:{'\n    '}
              <span className='syntax-string'>
                "Building scalable, maintainable, and reliable solutions "
              </span>{' '}
              +{'\n    '}
              <span className='syntax-string'>
                "that solve real user problems while keeping the codebase easy to evolve."
              </span>,
              {'\n\n  '}
              <span className='syntax-func'>solve</span>: (
              <span className='syntax-keyword'>complexProblem</span>) =&gt; {'{\n'}
              {'    '}
              <span className='syntax-comment'>
                {'// Transform chaos into elegant systems'}
              </span>
              {'\n    '}
              <span className='syntax-keyword'>return</span> complexProblem
              {'\n      '}.<span className='syntax-func'>refactor</span>()
              {'\n      '}.<span className='syntax-func'>optimize</span>()
              {'\n      '}.<span className='syntax-func'>deploy</span>();
              {'\n  '}
              {'},\n\n  '}status:{' '}
              <span className='syntax-string'>"Building the future"</span>
              {'\n'}
              {'};\n\n'}
              <span className='syntax-comment'>{'// Ready to collaborate?'}</span>
              {'\n'}
              <span className='syntax-keyword'>export default</span>{' '}
              rafaelValdez;
            </code>
          </pre>
        </div>
      </aside>
    </div>
  );
}

export default Hero;
