from django.conf.urls import patterns, include, url
from django.contrib import admin
from registration import views
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'WPKapp.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.home, name='home'),
    url(r'^signup/$', views.signup, name="signup" ),
    url(r'^login/$', views.login, name="login" ),
    url(r'^register/success/$', views.register_success, name="register"),
)
