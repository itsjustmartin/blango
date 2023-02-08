from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect
from django.utils import timezone

import logging
logger = logging.getLogger(__name__)


# from django.views.decorators.cache import cache_page
# from django.views.decorators.vary import vary_on_cookie

# Create your views here.

from blog.models import Post
from blog.forms import CommentForm




def components(request):
    return render(request, "blog/components.html")

# @cache_page(300)
# @vary_on_cookie
def index(request):
    posts = (
    Post.objects.filter(published_at__lte=timezone.now())
    .select_related("author")
    .only("title", "summary", "content", "author", "published_at", "slug")
    # .defer("modified_at","created_at","tags","comments")
    )
    logger.debug("Got %d posts", len(posts))
    return render(request, "blog/index.html" , {"posts": posts})

def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)

    if request.user.is_active:
        if request.method == "POST":
            comment_form = CommentForm(request.POST)
            if comment_form.is_valid():
                comment = comment_form.save(commit=False)
                comment.content_object = post
                comment.creator = request.user
                comment.save()
                logger.info(
    "Created comment on Post %d for user %s", post.pk, request.user
)
                return redirect(request.path_info)
        else:
            comment_form = CommentForm()
    else:
        comment_form = None

    return render(
        request, "blog/post-detail.html", {"post": post, "comment_form": comment_form}
    )


def get_ip(request):
  from django.http import HttpResponse
  return HttpResponse(request.META['REMOTE_ADDR'])

def question3(request):
    # Do not change this function body
    return render(request, "question3.html")

def question4(request):
    test_resources = get_test_resources()

    # Question 4: Add code to insert all test resources at once below
    Resource.objects.bulk_create(test_resources)

    return HttpResponse(", ".join(map(str, Resource.objects.all())))


def question5(request):
    test_resources = get_test_resources(save_to_db=True)

    # Question 5: Add code to update all test resources then save with a bulk call below
    # one way
    # from django.db.models import F
    # Resource.objects.all().update(cost=F('cost')+10)
    #second
    r = Resource.objects.all()
    for res in r :
        res.cost += 10
    Resource.objects.bulk_update(r,['cost'])
    return HttpResponse(", ".join(map(str, Resource.objects.all())))

