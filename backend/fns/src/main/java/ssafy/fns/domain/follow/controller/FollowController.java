package ssafy.fns.domain.follow.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.fns.domain.follow.service.FollowService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/follow")
@CrossOrigin("*")
@Slf4j
public class FollowController {

    private final FollowService followService;

}
