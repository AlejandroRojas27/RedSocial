package com.project.redSocial.Controllers;

import com.project.redSocial.Models.UserModel;
import com.project.redSocial.Repositories.UserRepository;
import com.project.redSocial.Services.UserServices;
import com.project.redSocial.Utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody UserModel usuario) {

        UserModel userLogged = userRepository.findUserByIdentifications(usuario);

        if (userLogged != null) {
            String token = jwtUtil.create(String.valueOf(userLogged.getId()), userLogged.getEmail());
            return token;
        }
        return "FAIL";
    }


}