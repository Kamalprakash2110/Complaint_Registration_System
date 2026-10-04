package com.example.student_backend;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {
    private final ComplaintRepository repository;

    public ComplaintController(ComplaintRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Complaint register(@RequestBody Complaint complaint) {
        if (isBlank(complaint.getName()) || isBlank(complaint.getEmail())
                || isBlank(complaint.getPhone()) || isBlank(complaint.getCategory())
                || isBlank(complaint.getLocation()) || isBlank(complaint.getPriority())
                || isBlank(complaint.getDescription())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please provide all required complaint details.");
        }
        complaint.setId(null);
        complaint.setStatus("Open");
        return repository.save(complaint);
    }

    @GetMapping
    public List<Complaint> list() {
        return repository.findAll();
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
