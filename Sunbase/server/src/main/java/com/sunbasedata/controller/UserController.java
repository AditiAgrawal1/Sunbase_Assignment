package com.sunbasedata.controller;

import com.sunbasedata.entity.AuthenticationRequest;
import com.sunbasedata.entity.CustomerRequest;
import org.springframework.http.*;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
//@CrossOrigin("*")
public class UserController {

    private final String AUTH_API_URL = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";
    private final String CREATE_CUSTOMER_API_URL = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create";

    private final RestTemplate restTemplate;

    public UserController() {
        this.restTemplate = new RestTemplate();
        // Add a message converter for JSON
        this.restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticateUser(@RequestBody AuthenticationRequest request) {
        String token = callAuthenticationAPI(request);

        if (token != null) {
            return new ResponseEntity<>(token, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }
//
//    @PostMapping("/createCustomer")
//    public ResponseEntity<String> createCustomer(
//            @RequestBody CustomerRequest customerRequest,
//            @RequestHeader("Authorization") String authorizationHeader
//    ) {
//        // Validate mandatory parameters
//        if (customerRequest.getFirst_name() == null || customerRequest.getLast_name() == null) {
//            return new ResponseEntity<>("First Name or Last Name is missing", HttpStatus.BAD_REQUEST);
//        }
//
//        // Prepare the request headers
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.set("Authorization", authorizationHeader);
//
//        // Create the request entity with headers and body
//        HttpEntity<CustomerRequest> requestEntity = new HttpEntity<>(customerRequest, headers);
//
//        // Send a request to create a new customer
//        ResponseEntity<String> responseEntity = restTemplate.exchange(
//                CREATE_CUSTOMER_API_URL, HttpMethod.POST, requestEntity, String.class);
//
//        // Return the response from the external API
//        return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
//    }

    private String callAuthenticationAPI(AuthenticationRequest request) {
        // Use the existing RestTemplate instance
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<AuthenticationRequest> entity = new HttpEntity<>(request, headers);

        // Use exchange method with ResponseEntity<String> to get the raw response as a String
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                AUTH_API_URL, HttpMethod.POST, entity, String.class);

        // Check if the response is successful (HTTP status code 2xx)
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            // Assuming the token is directly present in the response body
            return responseEntity.getBody();
        } else {
            return null;
        }
    }
}
