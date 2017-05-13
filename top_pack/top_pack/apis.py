import requests
import logging
import redis
import json

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

from constants import API_REPO_SEARCH, API_PACKAGE_JSON

redis_cache = redis.StrictRedis(host='localhost', port=6379, db=0)

logger = logging.getLogger(__name__)


class GithubRepoSearch(APIView):

    renderer_classes = (JSONRenderer,)

    def get(self, request):
        if redis_cache.get(request.GET.get('query')):
            resp = redis_cache.get(request.GET.get('query'))
            return Response(json.loads(resp))
        get_params = {}
        get_params.update({"q": request.GET.get('query'), "per_page": 100})
        response = requests.get(API_REPO_SEARCH, params=get_params)
        if response.status_code == 200:
            redis_cache.set(request.GET.get('query'), json.dumps(response.json()))
            return Response(response.json())
        logger.error("Unable to search repos {} {}".format(response.status_code, response.text))
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class GetPackageJson(APIView):
    renderer_classes = (JSONRenderer,)

    def _get_package_json(self, response_data):

        response = requests.get(response_data['download_url']).json()
        dependencies = []
        dependencies.extend(list(response.get('devDependencies',{}).keys()))
        dependencies.extend(list(response.get('dependencies',{}).keys()))
        return dependencies

    def get(self, request):
        response = requests.get(
            API_PACKAGE_JSON.format(request.GET.get('repo'))
        )
        if response.status_code == 200:
            return Response(self._get_package_json(response.json()))
        else:
            return Response(
                "{} project doesnot have pacakge.json".format(request.GET.get('repo')),
                status=status.HTTP_400_BAD_REQUEST)
