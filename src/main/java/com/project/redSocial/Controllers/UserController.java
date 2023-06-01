package com.project.redSocial.Controllers;

import com.project.redSocial.Models.UserModel;
import com.project.redSocial.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserServices userServices;

    @RequestMapping(value = "users", method = RequestMethod.GET)
    public ArrayList<UserModel> findUser(){
        return userServices.findUser();
    }

    @RequestMapping(value = "postUser", method = RequestMethod.POST)
    public UserModel postUser(@RequestBody UserModel user){
        return this.userServices.saveUser(user);
    }

    @RequestMapping(value = "user/{id}", method = RequestMethod.GET)
    public Optional<UserModel> findUserById(@PathVariable Long id){
        return userServices.findUserById(id);
    }

    @RequestMapping(value = "deleteUser/{id}" )
    public String deleateUser(@PathVariable Long id){
        if(this.userServices.deleteUser(id)){
            return "Se elimino con exito el usuario con id " + id;
        }else {
            return "No pudo eliminar el usuario con id" + id;
        }
    }

    @RequestMapping(value = "register", method = RequestMethod.POST)
    public void registerUser(@RequestBody UserModel user){
        userServices.saveUser(user);
    }

}
