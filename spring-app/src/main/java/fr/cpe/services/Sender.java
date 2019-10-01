package fr.cpe.services;

import fr.cpe.dto.Personne;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class Sender {

    private final JmsTemplate jmsTemplate;

    private static final String QUEUE_KEY = "nodejs-messaging.queue.name";

    private String queue;

    private final Environment environment;

    @Autowired
    public Sender(JmsTemplate jmsTemplate, Environment environment) {
        this.jmsTemplate = jmsTemplate;
        this.environment = environment;
    }

    @PostConstruct
    public void init() {
        queue = environment.getProperty(QUEUE_KEY);
    }

    public void setQueue(String queue) {
        this.queue = queue;
    }

    public void sendMessage(Personne personne) {

        // Send a message with a POJO - the template reuse the message converter
        System.out.println("Sending an personne message.");
        jmsTemplate.convertAndSend(queue, personne);
    }
}
