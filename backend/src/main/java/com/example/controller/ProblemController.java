package com.example.controller;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/problems")
/* @CrossOrigin(origins = "*") */
public class ProblemController {

    private List<Problem> problems = new ArrayList<>();

    // 고민 목록 가져오기 (GET)
    @GetMapping(produces = "application/json")
    public List<Problem> getProblems() {
        return problems;
    }

    // 고민 추가하기 (POST)
    @PostMapping(consumes = "application/json", produces = "application/json")
    public Problem addProblem(@RequestBody Problem problem) {
        problems.add(problem);
        return problem; // 클라이언트에 추가된 문제를 반환
    }
}

class Problem {
    private String content;

    // getter, setter
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}