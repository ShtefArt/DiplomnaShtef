package com.eventboard.springjwt.services;

import com.eventboard.springjwt.models.Event;
import com.eventboard.springjwt.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> fetch() {
        return eventRepository.findAll();
    }

    public Optional<Event> getOne(Long id) {
        return eventRepository.findById(id);
    }

    public void create(Event eventToCreate) {
        eventRepository.save(eventToCreate);
    }

    public void update(Event eventToUpdate) {
        eventRepository.save(eventToUpdate);
    }

    public void delete(Long id) {
        eventRepository.deleteById(id);
    }

}
