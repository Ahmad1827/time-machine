#include <SFML/Graphics.hpp>
#include <iostream>

int main() {
    sf::RenderWindow window(sf::VideoMode(800, 600), "Analog Hardware Simulator");
    window.setFramerateLimit(60);

    sf::Texture texture;
    if (!texture.loadFromFile("assets/input.png")) {
        std::cerr << "Failed to load assets/input.png\n";
        return -1;
    }

    sf::Sprite sprite(texture);

    sf::Vector2u texSize = texture.getSize();
    sf::Vector2u winSize = window.getSize();
    float scaleX = (float)winSize.x / texSize.x;
    float scaleY = (float)winSize.y / texSize.y;
    sprite.setScale(scaleX, scaleY);

    if (!sf::Shader::isAvailable()) {
        std::cerr << "Shaders are not available on this system\n";
        return -1;
    }

    sf::Shader shader;
    if (!shader.loadFromFile("shaders/crt.frag", sf::Shader::Fragment)) {
        std::cerr << "Failed to load shaders/crt.frag\n";
        return -1;
    }

    shader.setUniform("resolution", sf::Vector2f((float)winSize.x, (float)winSize.y));

    while (window.isOpen()) {
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed) {
                window.close();
            }
        }

        shader.setUniform("texture", sf::Shader::CurrentTexture);

        window.clear();
        window.draw(sprite, &shader);
        window.display();
    }

    return 0;
}
