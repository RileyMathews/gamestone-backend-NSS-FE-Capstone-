from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from api.models import Platform
import requests

import json

class Command(BaseCommand):
    help = 'backfill platforms from the giantbomb api'
    platforms_url = f"https://www.giantbomb.com/api/platforms?api_key={settings.GIANTBOMB_API_KEY}&format=json&field_list=id,name,abbreviation,company"
    request_headers = {
        'User-Agent': 'gamestone-api'
    }

    def handle(self, *args, **options):
        self.iterate_over_pages()

    def iterate_over_pages(self, offset=0):
        response = self.fetch_platforms(offset)
        for platform_dict in response.get('results'):
            platform = self.platform_from_dict(platform_dict)
            platform.save()
            print(f"saved {platform.name} from {platform.company}")
        number_of_page_results = response.get('number_of_page_results')
        if number_of_page_results == response.get('limit'):
            self.iterate_over_pages(offset + number_of_page_results)
        


    def platform_from_dict(self, dict):
        company_dict = dict.get('company') or {}
        company_name = company_dict.get('name') or ''
        return Platform(
            id=dict.get('id'),
            name=dict.get('name'),
            company=company_name,
            abbreviation=dict.get('abbreviation'),
        )

    def fetch_platforms(self, page) -> dict:
        url_with_page = f"{self.platforms_url}&offset={page}"
        response = requests.get(url_with_page, headers=self.request_headers)
        return json.loads(response.content)

