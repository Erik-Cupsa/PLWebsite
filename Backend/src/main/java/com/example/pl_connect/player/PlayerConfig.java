package com.example.pl_connect.player;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class PlayerConfig {

    @Bean
    CommandLineRunner commandLineRunner(PlayerRepository repository) {
        return args -> {
            Player gabriel = new Player(
                    "Gabriel"
            );

            Player alex = new Player(
                    "Alex"
            );
        };
    }
}
