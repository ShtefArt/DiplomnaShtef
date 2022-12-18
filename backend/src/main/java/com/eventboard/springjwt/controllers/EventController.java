package com.eventboard.springjwt.controllers;

import com.eventboard.springjwt.models.Event;
import com.eventboard.springjwt.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/events")
@CrossOrigin(origins = {"http://localhost:4200/"}, methods = {RequestMethod.DELETE, RequestMethod.POST})
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Event> fetch() {
        return eventService.fetch();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public Event getOne(@PathVariable Long id) {
        return eventService.getOne(id).orElseThrow(() -> new EntityNotFoundException("Event not found"));
    }

    @PostMapping("/new")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public void create(@Valid @RequestBody Event event) {
        eventService.create(event);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public void update(@Valid @RequestBody Event event, @PathVariable Long id) {
        Optional<Event> oldEvent = eventService.getOne(id);
        if(oldEvent.isPresent()) {
            event.setId(id);
            eventService.update(event);
        } else {
            throw new EntityNotFoundException("Event not found");
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        eventService.delete(id);
    }

}
