package fr.cpe;

import fr.cpe.services.Sender;
import fr.cpe.dto.Personne;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class Application {

//	TEST SENDER
//	public static void main(String[] args) {
//		ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
//
//		System.out.println("Sending an personne message.");
//		Sender sender = context.getBean(Sender.class);
//		sender.sendMessage(new Personne("CPE", "to-node-queue"));
//
//		String queueKey = "spring-messaging.queue.name";
//		sender.setQueue(context.getEnvironment().getProperty(queueKey));
//		sender.sendMessage(new Personne("CPE", "to-spring-queue"));
//		sender.init();
//	}

	public static void main(String[] args) {
		// Launch the application
		SpringApplication.run(Application.class, args);
	}
}
