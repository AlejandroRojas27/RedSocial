package com.project.redSocial.Services;

import com.project.redSocial.Models.UserModel;
import com.project.redSocial.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserServices {

    @Autowired
    UserRepository userRepository;

    public ArrayList<UserModel> findUser(){
        return (ArrayList<UserModel>) userRepository.findAll();
    }

    public UserModel saveUser(UserModel user){
        return userRepository.save(user);
    }

    public Optional<UserModel> findUserById(Long id){
        return userRepository.findById(id);
    }

    public boolean deleteUser(Long id){

        try {
            userRepository.deleteById(id);
            return true;
        }catch (Exception err){
            return false;
        }
    }
}
