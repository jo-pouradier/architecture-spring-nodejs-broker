package fr.cpe.spring;

import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.ErrorHandler;

import io.micrometer.common.lang.NonNull;

@Service
public class ExampleErrorHandler implements ErrorHandler{   

    private static final Logger log = org.apache.logging.log4j.LogManager.getLogger(ExampleErrorHandler.class);

    @Override
    public void handleError(@SuppressWarnings("null") @NonNull Throwable t) {
        //handle exception here
        log.error("Error in JMS listener", t);

    }
}