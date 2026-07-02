# Analog Hardware VFX Simulator

A standalone C++ and OpenGL application designed to physically simulate the visual artifacts of vintage display and capture hardware. Rather than relying on static overlays, this project uses real-time GLSL fragment shaders to mathematically replicate the quirks of analog vacuum tubes and early silicon sensors.

The project is built around a love for low-level systems programming and hardware preservation, specifically aiming to recreate the exact visual characteristics of color CRT televisions and mid-2000s digital point-and-shoot cameras.

## Features

### Phase 1: CRT Simulation (Active)
* **Barrel Distortion:** Simulates the physical curvature of a heavy glass vacuum tube by applying an exponential coordinate warp.
* **Electron Beam Bloom:** Replicates the high-intensity light bleed of the electron gun firing into neighboring phosphors.
* **RGB Phosphor Mask:** Emulates the physical aperture grille by isolating discrete red, green, and blue sub-pixels based on exact window coordinates.
* **Scanlines:** High-frequency sine wave application tied to window resolution to simulate the horizontal sweep of the electron beam.

### Phase 2: Early Digital Camera (Upcoming)
* **CCD Fixed Pattern Noise:** Pseudo-random texture generation to simulate early CCD sensor grain.
* **Low-Light Color Banding:** Signal-to-noise degradation and color channel quantization.
* **Chromatic Aberration:** Optical fringing caused by inexpensive plastic lenses.

## Tech Stack

* **Language:** C++17
* **Graphics & Windowing:** SFML (Simple and Fast Multimedia Library)
* **Shaders:** GLSL / raw OpenGL
* **Environment:** Linux / WSL2 via X11

## Project Structure

* `src/` - C++ source files and SFML window management.
* `shaders/` - GLSL fragment shaders.
* `assets/` - Input textures and test images.

## Build Instructions

Ensure you have the SFML development libraries installed. On Debian/Ubuntu:

```bash
sudo apt update
sudo apt install g++ make libsfml-dev
```

Compile the project using the provided `Makefile`:

```bash
make
```

Execute the binary:

```bash
./vfx_simulator
```

## Usage

By default, the application looks for an image at `assets/input.png`. The texture is dynamically scaled to fit the 800x600 window while applying the active fragment shader.
