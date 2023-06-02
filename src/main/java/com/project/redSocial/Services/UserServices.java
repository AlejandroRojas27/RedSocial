package com.project.redSocial.Services;

import com.project.redSocial.Models.UserModel;
import com.project.redSocial.Repositories.UserRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServices implements UserRepository {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<UserModel> getUsers() {
        String query = "FROM UserModel";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void saveUser(UserModel user) {
        entityManager.merge(user);
    }

    @Override
    public UserModel findUserById(Long id) {
        return entityManager.find(UserModel.class, id);
    }

    @Override
    public void deleteUser(Long id) {
        UserModel user = entityManager.find(UserModel.class, id);
        entityManager.remove(user);
    }

    @Override
    public UserModel findUserByIdentifications(UserModel user) {
        String query = "FROM UserModel WHERE email = :email";
        List<UserModel> list = entityManager.createQuery(query)
                .setParameter("emai", user.getEmail())
                .getResultList();

        if(list.isEmpty()){
            return null;
        }

        String passwordHashed = list.get(0).getPassword();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

        if(argon2.verify(passwordHashed, user.getPassword())){
            return list.get(0);
        }

        return null;
    }

    /*
    @Autowired
    UserRepository userRepository;

    public ArrayList<UserModel> findUsers() {
        return (ArrayList<UserModel>) userRepository.findAll();
    }

    public UserModel saveUser(UserModel user) {
        return userRepository.save(user);
    }

    public Optional<UserModel> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public boolean deleteUser(Long id) {

        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception err) {
            return false;
        }
    }

     */


}
