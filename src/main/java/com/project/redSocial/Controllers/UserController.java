package com.project.redSocial.Controllers;

import com.project.redSocial.Models.UserModel;
import com.project.redSocial.Services.UserServices;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class UserController {

    @Autowired
    UserServices userServices;

    @RequestMapping(value = "api/users", method = RequestMethod.GET)
    public List<UserModel> getUsers() {
        return userServices.getUsers();
    }

    @RequestMapping(value = "api/register", method = RequestMethod.POST)
    public void registerUser(@RequestBody UserModel user) {

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hashedPassword = argon2.hash(1,1024,1,user.getPassword());

        user.setPassword(hashedPassword);

        userServices.saveUser(user);
    }

    @RequestMapping(value = "user/{id}", method = RequestMethod.GET)
    public UserModel findUserById(@PathVariable Long id) {
        return userServices.findUserById(id);
    }

    @RequestMapping(value = "api/user/{email}", method = RequestMethod.GET)
    public List<UserModel> findUserByEmail(@PathVariable String email){
        return userServices.findUserByEmail(email);
    }

    @RequestMapping(value = "api/deleteUser/{id}", method = RequestMethod.DELETE)
    public String deleteUser(@PathVariable Long id) {
        try {
            this.userServices.deleteUser(id);
            return "Se elimino con exito el usuario con id " + id;
        } catch (Exception err) {
            return "No pudo eliminar el usuario con id" + id;
        }
    }




}
