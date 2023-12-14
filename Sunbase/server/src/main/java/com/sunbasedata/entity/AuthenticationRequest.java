package com.sunbasedata.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthenticationRequest {
    private String login_id;
    private String password;

    // getters and setters
}
