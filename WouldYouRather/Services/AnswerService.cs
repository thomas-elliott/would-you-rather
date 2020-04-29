using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using WouldYouRather.Contexts;
using WouldYouRather.Entities;
using WouldYouRather.Models;

namespace WouldYouRather.Services
{
    public class AnswerService
    {
        private readonly GameContext _gameContext;
        private readonly ILogger<AnswerService> _log;
        
        public AnswerService(ILogger<AnswerService> log, 
                             GameContext gameContext)
        {
            _gameContext = gameContext;
            _log = log;
        }

        public List<AnswerResponse> GetAnswers(string gameId)
        {
            _log.LogInformation($"Get answers for gameId {gameId}");
            return _gameContext.Answers
                .Where(x => x.GameId == gameId)
                .Select(x => AnswerResponse.FromAnswer(x))
                .ToList();
        }

        public AnswerResponse GetAnswer(int answerId)
        {
            _log.LogInformation($"Get answer for answerId {answerId}");
            return _gameContext.Answers
                .Where(x => x.Id == answerId)
                .Select(x => AnswerResponse.FromAnswer(x))
                .First();
        }

        public AnswerResponse AddAnswer(string request, string gameId)
        {
            _log.LogInformation($"Adding answer for gameId {gameId}: {request}");

            if (!_gameContext.Games.Any(x => x.Id == gameId))
            {
                return null;
            }
            
            var answer = _gameContext.Answers.Add(
                new Answer
                {
                    Text = request,
                    Submitted = DateTime.Now,
                    GameId = gameId
                });
            _gameContext.SaveChanges();

            return AnswerResponse.FromAnswer(answer.Entity);
        }
    }
}