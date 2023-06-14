package com.project.redSocial.Repositories;

import com.project.redSocial.Models.UserModel;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository {

    List<UserModel> getUsers();

    void saveUser(UserModel user);

    UserModel findUserById(Long id);

    void deleteUser(Long id);

    UserModel findUserByIdentifications(UserModel user);

    List<UserModel> findUserByEmail(String email);
}
