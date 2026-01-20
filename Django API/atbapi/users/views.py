from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer, GoogleLoginSerializer
from rest_framework import parsers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser

from .models import CustomUser

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    # Create your views here.
    @action(detail=False, methods=['post'], url_path='register', serializer_class=RegisterSerializer)
    def register(self, request):

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    @action(detail=False, methods=["post"], url_path="login", parser_classes=[JSONParser, FormParser, MultiPartParser], serializer_class=LoginSerializer)
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    

    @action(detail=False, methods=["get"], url_path="me", permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


    @action(detail=False, methods=["post"], url_path="password-reset", parser_classes=[JSONParser, FormParser, MultiPartParser], serializer_class=PasswordResetSerializer)
    def password_reset(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Лист для відновлення пароля відправлено"},
            status=status.HTTP_200_OK
        )
    

    @action(detail=False, methods=["post"], url_path="password-reset-confirm", parser_classes=[JSONParser, FormParser, MultiPartParser], serializer_class=PasswordResetConfirmSerializer)
    def password_reset_confirm(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["post"], url_path="google-login", serializer_class=GoogleLoginSerializer, parser_classes=[JSONParser, FormParser, MultiPartParser])
    def google_login(self, request):
        serializer = GoogleLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=200)
