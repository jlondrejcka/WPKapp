from django.shortcuts import render
from registration.forms import *
from django.views.decorators.csrf import csrf_protect
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib import messages

# Create your views here.
@csrf_protect
def home(request):
    return render(request, 'home.html', {})

@csrf_protect
def signup(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = User.objects.create_user(
            username=form.cleaned_data['username'],
            password=form.cleaned_data['password'],
            email=form.cleaned_data['email']
            )
            return HttpResponseRedirect('/register/success/')
        else:
            messages.add_message(request, messages.ERROR, form.errors)
    else:
        form = RegistrationForm()

    variables = RequestContext(request, {
    'form': form
    })

    return render(request, 'registration/signup.html')

@csrf_protect
def login(request):
    if request.method == 'POST':
        Email = request.POST.get('email', '')
        Password = request.POST.get('password', '')
        user = User.objects.get(email=Email)
        UserName = user.get_username()
        print("username", UserName)
        user = auth.authenticate(username = UserName, password = Password)
        if user is not None and user.is_active:
            # Correct password, and the user is marked "active"
            print("User is not None")
            auth.login(request, user)
            # Redirect to a success page.
            return HttpResponseRedirect("/login/success/")
        else:
            # Show an error page
            print("User is None")
            messages.add_message(request, messages.INFO, "Unable login!" "Check username/password")
    else:
        form = LoginForm()
        variables = RequestContext(request, {
        'form': form
        })

    return render(request, 'registration/login.html')

@csrf_protect
def register_success(request):
    return render(request, 'private_page/main.html')

@csrf_protect
def logout_page(request):
    logout(request)
    return HttpResponseRedirect('/')


@login_required
def main(request):
    return render(request, 'private_page/main.html')

@csrf_protect
def ResetPassword(request):
    if request.method == 'POST':
        print("1111111111111")
        form = PassworResetForm(request.POST)
        print("22222222222222222222")
        if form.is_valid():
            print("333333333333333333333")
            return HttpResponseRedirect('/register/success')
        else:
            messages.add_message(request,
                     messages.ERROR,
                     "Unable ResetPassword! "
                     "Check your Email")

    variables = RequestContext(request, {
    'form': form
    })

    return render(request, 'private_page/main.html')
