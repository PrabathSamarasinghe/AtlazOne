"use client";

import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import React, { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";

const ParticleContainer: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    return await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {}, []);
  return (
    <Particles
      className="w-full h-full absolute inset-0"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: "",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onclick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 90,
            },
            repulse: {
              distance: 100,
              duration: 1,
            },
          },
        },
        particles: {
          color: {
            value: "#ff3131",
          },
          links: {
            color: "#ff3131",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleContainer;
