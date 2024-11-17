package fr.cpe.services;

import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

import fr.cpe.dto.Personne;

@Service
public class Receiver {

    private static final Logger log = org.apache.logging.log4j.LogManager.getLogger(Receiver.class);
    private final Sender sender;

    @Autowired
    public Receiver(Sender sender) {
        log.info("Receiver created");
        this.sender = sender;
    }

    @JmsListener(destination = "${spring-messaging.queue.name}")
    public void receiveMessage(Personne personne) {
        log.info(personne);
        sender.sendMessage(personne);
    }
}