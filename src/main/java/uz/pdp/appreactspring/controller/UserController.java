package uz.pdp.appreactspring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import uz.pdp.appreactspring.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;
//
//    @RequestMapping(value = "/user",method = RequestMethod.GET)
//    public List<User1> getEmployees(){
//        return userRepository.findAll();
//    }
//
//    @RequestMapping(value = "/user",method = RequestMethod.POST)
//    public User1 createEmployee(@RequestBody User1 user1){
//        return userRepository.save(user1);
//    }
//
//    @RequestMapping(value = "/user/{id}",method = RequestMethod.GET)
//    public User1 getUserById(@PathVariable Integer id){
//        Optional<User1> optionalUser1 = userRepository.findById(id);
//        return optionalUser1.orElseGet(User1::new);
//    }
//
//    @RequestMapping(value = "/user/{id}",method = RequestMethod.PUT)
//    public String editUser(@PathVariable Integer id,@RequestBody User1 user){
//        boolean hasEmail = false;
//        Optional<User1> optionalUser1 = userRepository.findById(id);
//        if (optionalUser1.isPresent()){
//            for (User1 user1 : userRepository.findAll()) {
//                if (user1.getEmail().equals(user.getEmail())) {
//                    hasEmail = true;
//                    break;
//                }
//            }
//            if (!hasEmail){
//                User1 user1 = optionalUser1.get();
//                user1.setFirstName(user.getFirstName());
//                user1.setLastName(user.getLastName());
//                user1.setEmail(user.getEmail());
//                userRepository.save(user1);
//                return "User edited successfully!";
//            }else{
//                return "Error! Enter other email...";
//            }
//        }
//        else {
//            return "Error! User does not found..";
//        }
//    }

}
