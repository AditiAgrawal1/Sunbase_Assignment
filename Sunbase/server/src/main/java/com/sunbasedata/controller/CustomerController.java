package com.sunbasedata.controller;

import com.sunbasedata.entity.CustomerReqDTO;
import com.sunbasedata.entity.CustomerRequest;
import org.springframework.http.*;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@RestController
//@CrossOrigin("*")
public class CustomerController {

    private final String API_BASE_URL = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp";
    private final String GET_CUSTOMER_LIST_PATH = "?cmd=get_customer_list";
    private final String DELETE_CUSTOMER_PATH = "?cmd=delete";
    private final String UPDATE_CUSTOMER_PATH = "?cmd=update";
    private final String CREATE_CUSTOMER_API_URL = "?cmd=create";
    private final RestTemplate restTemplate;

    public CustomerController() {
        this.restTemplate = new RestTemplate();
        // Add a message converter for JSON
        this.restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
    }
    @PostMapping("/createCustomer")
    public ResponseEntity<String> createCustomer(
            @RequestBody CustomerRequest customerRequest,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        // Validate mandatory parameters
        if (customerRequest.getFirst_name() == null || customerRequest.getLast_name() == null) {
            return new ResponseEntity<>("First Name or Last Name is missing", HttpStatus.BAD_REQUEST);
        }

        // Prepare the request headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", authorizationHeader);

        // Create the request entity with headers and body
        HttpEntity<CustomerRequest> requestEntity = new HttpEntity<>(customerRequest, headers);

        // Send a request to create a new customer
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                API_BASE_URL + CREATE_CUSTOMER_API_URL, HttpMethod.POST, requestEntity, String.class);

        // Return the response from the external API
        return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
    }


    @GetMapping("/getCustomerList")
    public ResponseEntity<List<CustomerRequest>> getCustomerList(
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authorizationHeader);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<CustomerRequest[]> responseEntity = restTemplate.exchange(
                API_BASE_URL + GET_CUSTOMER_LIST_PATH, HttpMethod.GET, requestEntity, CustomerRequest[].class);

        List<CustomerRequest> customerList = Arrays.asList(responseEntity.getBody());
        return new ResponseEntity<>(customerList, responseEntity.getStatusCode());
    }

    @PostMapping("/deleteCustomer")
    public ResponseEntity<String> deleteCustomer(
            @RequestParam String uuid,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", authorizationHeader);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                API_BASE_URL + DELETE_CUSTOMER_PATH + "&uuid=" + uuid, HttpMethod.POST, requestEntity, String.class);

        return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
    }

    @PostMapping("/updateCustomer")
    public ResponseEntity<String> updateCustomer(
            @RequestParam String uuid,
            @RequestBody CustomerReqDTO customerReqDTO,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        // Validate mandatory parameters
        if (customerReqDTO.getFirst_name() == null || customerReqDTO.getLast_name() == null) {
            return new ResponseEntity<>("First Name or Last Name is missing", HttpStatus.BAD_REQUEST);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", authorizationHeader);
        HttpEntity<CustomerReqDTO> requestEntity = new HttpEntity<>(customerReqDTO, headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                API_BASE_URL + UPDATE_CUSTOMER_PATH + "&uuid=" + uuid, HttpMethod.POST, requestEntity, String.class);

        return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
    }

}